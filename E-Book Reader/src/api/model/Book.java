package api.model;

public class Book {

	private String bname;
	private String aname;
	
	public Book() {

	}

	public Book(String bcode, String bname, String aname) {
		this.bname = bname;
		this.aname = aname;
	}

	public String getBName() {
		return bname;
	}

	public void setBName(String BName) {
		this.bname = BName;
	}
	
	public String getAName() {
		return aname;
	}

	public void setAName(String AName) {
		this.aname = AName;
	}
}
