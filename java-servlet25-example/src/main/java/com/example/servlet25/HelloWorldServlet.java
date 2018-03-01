package com.example.servlet25;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

/**
 * HelloWorldServlet class
 */
public class HelloWorldServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        // Set the response message's MIME type.
        response.setContentType("text/html;charset=UTF-8");
        // Allocate a output writer to write the response message into the network socket.
        PrintWriter out = response.getWriter();

        // Write the response message, in an HTML document.
        try {
            out.println("<!DOCTYPE html>");  // HTML 5
            out.println("<html><head>");
            out.println("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>");
            out.println("<title>Servlet 2.5 Example</title></head>");
            out.println("<body>");
            out.println("<h1>Hello World!</h1>");  // Prints "Hello, world!"
            // Set a hyperlink image to refresh this page
            out.println("<a href='" + request.getRequestURI() + "'><img src='images/return.gif'></a>");
            out.println("</body></html>");
        } finally {
            out.close();  // Always close the output writer
        }
    }

}
