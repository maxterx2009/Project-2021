package api.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import api.model.Book;
import api.model.BookChapter;
import api.model.ChangeAuthor;
import api.model.NewChapterContent;
import connection.MySQLConnUtils;

@Path("/BookView")
public class POSTService {
	@Path("/createBook")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createBook(Book Answer) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			
			String sql = "select BCode from book";
			PreparedStatement pstm = db.prepareStatement(sql);
			
			ResultSet rs = pstm.executeQuery();
			
			int i = 1;
			
			while (rs.next()) {
				if (i != rs.getInt(1)) {
					break;
				}
				i++;
			}
			
			sql = "INSERT INTO BOOK VALUES(?,?,?)";
			pstm = db.prepareStatement(sql);
			pstm.setString(1, String.valueOf(i));
			pstm.setString(2, Answer.getBName());
			pstm.setString(3, Answer.getAName());
			System.out.println(Answer.getBName());
			System.out.println(Answer.getAName());

			pstm.executeUpdate();
			return Response.ok().entity("Book is successfully created").build();
		}
		catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
	
	@Path("/createChapter")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createBook(BookChapter bookchapter) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			
			String sql = "select CId from bookchapter";
			PreparedStatement pstm = db.prepareStatement(sql);
			
			ResultSet rs = pstm.executeQuery();
			
			int i = 1;
			
			while (rs.next()) {
				if (i != rs.getInt(1)) {
					break;
				}
				i++;
			}
			
			sql = "INSERT INTO BOOKCHAPTER VALUES(?,?,?,?)";
			pstm = db.prepareStatement(sql);
			pstm.setString(1, bookchapter.getBCode());
			pstm.setString(2, String.valueOf(i));
			pstm.setString(3, bookchapter.getCTitle());
			pstm.setString(4, bookchapter.getCContent());
			System.out.println(bookchapter.getBCode());
			System.out.println(bookchapter.getCTitle());
			System.out.println(bookchapter.getCContent());
			pstm.executeUpdate();
			return Response.ok().entity("Chapter is successfully created").build();
		}catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
	
	@Path("/updateContent")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateChapter(NewChapterContent bookchaptercontent) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			
			String sql = "UPDATE bookchapter SET CContent = ? where BCode = ? and CId = ?";
			PreparedStatement pstm = db.prepareStatement(sql);
			pstm.setString(1, bookchaptercontent.getContent());
			pstm.setString(2, bookchaptercontent.getBcode());
			pstm.setString(3, bookchaptercontent.getCid());
			
			System.out.println(bookchaptercontent.getBcode());
			System.out.println(bookchaptercontent.getCid());
			System.out.println(bookchaptercontent.getContent());
			pstm.executeUpdate();
			return Response.ok().entity("Content is successfully update").build();
		}catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
	
	@Path("/updateAuthor")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateAuthor(ChangeAuthor changeAuthor) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		try {
			System.out.println(changeAuthor.getAuthor() + changeAuthor.getBcode());
			String sql = "UPDATE book SET AName = ? where BCode = ?";
			PreparedStatement pstm = db.prepareStatement(sql);
			pstm.setString(1, changeAuthor.getAuthor());
			pstm.setString(2, changeAuthor.getBcode());
			
			pstm.executeUpdate();
			return Response.ok().entity("Author is successfully update").build();
		}catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
}
