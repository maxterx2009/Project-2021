package api.model;

public class BookChapter{
	private String bcode;
	private String ctitle;
	private String ccontent;
	
	public BookChapter() {

	}
	
	public BookChapter(String bcode, String ctitle, String ccontent) {
		this.ctitle = ctitle;
		this.ccontent = ccontent;
		this.bcode = bcode;
	}
	 public String getBCode() {
	       return bcode;
	   }

	   public void setBCode(String BCode) {
	       this.bcode = BCode;
	   }
	   
	   public String getCTitle() {
	       return ctitle;
	   }

	   public void setCTitle(String CTitle) {
	       this.ctitle = CTitle;
	   }
	   public String getCContent() {
	       return ccontent;
	   }

	   public void setCContent(String CContent) {
	       this.ccontent = CContent;
	   }
}