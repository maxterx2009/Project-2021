package api.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.naming.NamingException;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import connection.MySQLConnUtils;

@Path("/BookView")
public class GETService {
	@Path("book")
	@GET
	public Response getBook(
			@DefaultValue("") @QueryParam("bookID") String bookID
			) throws SQLException, NamingException, ClassNotFoundException   {
		
		Connection db = MySQLConnUtils.getMySQLConnection();
		try {
			String author = null;
			String bookname = null;
			
			PreparedStatement st = db.prepareStatement(
					"Select AName, BName from book where BCode = ?"
					);
			st.setString(1, bookID);
			
			ResultSet rs = st.executeQuery();
			
			while(rs.next()) {
				author = rs.getString(1);
				bookname = rs.getString(2);
			}
			
			JsonArrayBuilder bookInfo = Json.createArrayBuilder();
			
			st = db.prepareStatement(
					"Select CId, CTitle, CContent from bookchapter where BCode = ?"
			);
			st.setString(1, bookID);
			
			rs = st.executeQuery();
			while (rs.next()) {
				
				
				bookInfo.add((javax.json.JsonValue) Json.createObjectBuilder().add("chapterID", rs.getInt(1))
		        													.add("title", rs.getString(2))
		        													.add("content", rs.getString(3))
		        													.build());
		    }
			
			JsonObject book = Json.createObjectBuilder().add("bookID", bookID).add("bookName", bookname).add("author", author).add("bookInfo", bookInfo.build()).build();
			
		return Response.ok().entity(book.toString()).build();
		}
		finally {
			db.close();
		}
	}
	
	@Path("allbook")
	@GET
	public Response getAllBook() throws SQLException, NamingException, ClassNotFoundException   {
		
		Connection db = MySQLConnUtils.getMySQLConnection();
		System.out.println("database connected");
		try {
			
			JsonArrayBuilder books = Json.createArrayBuilder();
			
			PreparedStatement stt = db.prepareStatement(
					"Select * from book"
					);
			
			ResultSet rss = stt.executeQuery();
			
			while (rss.next()) {
				String author = rss.getString(3);
				String bookID = rss.getString(1);
				String bookName = rss.getString(2);
				
				JsonArrayBuilder bookInfo = Json.createArrayBuilder();
				
				PreparedStatement st = db.prepareStatement(
						"Select CId, CTitle, CContent from bookchapter where BCode = ?"
				);
				st.setString(1, bookID);
				
				ResultSet rs = st.executeQuery();
				while (rs.next()) {
					
					bookInfo.add((javax.json.JsonValue) Json.createObjectBuilder().add("chapterID", rs.getInt(1))
			        													.add("title", rs.getString(2))
			        													.add("content", rs.getString(3))
			        													.build());
			    }
				
				JsonObject book = Json.createObjectBuilder().add("bookID",bookID).add("bookName", bookName).add("author", author).add("bookInfo", bookInfo.build()).build();
				
				books.add(book);
			}
		return Response.ok().entity(books.build().toString()).build();
		}
		finally {
			db.close();
		}
	}
	
	@Path("books")
	@GET
	public Response book() throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			JsonArrayBuilder book = Json.createArrayBuilder();
			
			String sql = "select BCode, BName from book";
			PreparedStatement pstm = db.prepareStatement(sql);
			
			ResultSet rs = pstm.executeQuery();
			
			while (rs.next()) {
				book.add((javax.json.JsonValue) Json.createObjectBuilder().add("BCode", rs.getString(1)).add("BName", rs.getString(2)).build());
				//book.add(rs.getString(1));
			}
			
			JsonArray retArray = book.build();
			
			return Response.ok().entity(retArray.toString()).build();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
	
	@Path("authorName")
	@GET
	public Response author(@DefaultValue("") @QueryParam("bookID") String bookID) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			
			String sql = "select AName from book where BCode = ?";
			
			PreparedStatement pstm = db.prepareStatement(sql);
			
			pstm.setString(1, bookID);
			
			ResultSet rs = pstm.executeQuery();
			rs.next();
			
			
			return Response.ok().entity(rs.getString(1)).build();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
		}
		finally {
			db.close();			
		}
	}
}

