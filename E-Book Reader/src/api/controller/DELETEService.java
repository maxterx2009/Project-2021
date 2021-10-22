package api.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import api.model.DeleteBook;
import api.model.DeleteChapter;
import connection.MySQLConnUtils;

@Path("/BookView")
public class DELETEService {
	@Path("/deleteBook")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteBook(DeleteBook book) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		System.out.println("cac");
		try {
			String sql = "DELETE FROM book WHERE BCode = ?";
			PreparedStatement pstm = db.prepareStatement(sql);
			pstm.setString(1, book.getBcode());
			System.out.println(book.getBcode());
			pstm.executeUpdate();
			return Response.ok().entity("Book is successfully deleted").build();
		}catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
	
	@Path("/deleteChapter")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteChapter(DeleteChapter chapter) throws ClassNotFoundException, SQLException {
		Connection db= MySQLConnUtils.getMySQLConnection();
		System.out.println("cac");
		try {
			String sql = "DELETE FROM bookchapter WHERE BCode = ? and CId = ?";
			PreparedStatement pstm = db.prepareStatement(sql);
			pstm.setString(1, chapter.getBcode());
			pstm.setString(2, chapter.getCid());
			System.out.println(chapter.getBcode());
			System.out.println(chapter.getCid());
			pstm.executeUpdate();
			return Response.ok().entity("Chapter is successfully deleted").build();
		}catch(SQLException e) {
			e.printStackTrace();
			return Response.ok().entity(e.toString()).build();
			}
		finally {
			db.close();			
		}
	}
}
