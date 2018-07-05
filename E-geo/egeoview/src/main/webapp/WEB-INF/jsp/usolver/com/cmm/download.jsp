<%@ page language="java" contentType="text/html; charset=UTF-8" import ="java.io.*,java.net.*,java.util.*"%>
<%
 
try
{
    response.setHeader("Content-Type", "application/octet-stream; charset=UTF-8");
    
    //String dir =request.getParameter("dir");    
    String dir ="C:/arcgisserver/directories/arcgisoutput/Utilities/PrintingTools_GPServer/";    
   
    
    String filename1 = request.getParameter("file");

    File file = new File (dir + filename1);
    System.out.println("dir : " + file.getAbsolutePath());
    response.setHeader("Content-Disposition", "attachment;filename=" + filename1+";");
   
    byte[] b = new byte[1024];

    if (file.isFile())
    {
    	out.clear(); //out--> jsp자체 객체
        out=pageContext.pushBody(); //out--> jsp자체 객체
        
        System.out.println("[DEBUG] " + file.getName());
        
        BufferedInputStream ins = new BufferedInputStream(new FileInputStream(file));
        BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
        int read = 0;

        try
        {
            while ((read = ins.read(b)) != -1)
            {
                outs.write(b,0,read);
            }

            ins.close();
            outs.close();
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }
        finally
        {
            if (ins != null)  ins.close();
        }
    }
}
catch(Exception ex)
{
    System.out.println(ex.getMessage());
}
%>



