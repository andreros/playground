# Java Servlet using v2.5 Servlet API Example

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Guidelines on how to create a Java Servlet using the 2.5 Servlet API with Maven and IntelliJ.

## Creating a Java Servlet using the 2.5 Servlet API with Maven and IntelliJ

Requesites

-   Apache Maven (version 3.3.9 used)
-   Idea IntelliJ (version 2016.3 used)
-   Apache Tomcat (version 9.0 used)

Generate new Maven project
--------------------------

From the command line, go to the projects directory and execute the
following command:

<pre><code>
mvn archetype:generate -DgroupId=com.example.servlet25
                       -DartifactId=servlet25-example
                       -DarchetypeArtifactId=maven-archetype-webapp
</code></pre>

Configure IntelliJ newly created Maven project
----------------------------------------------

On IntelliJ choose from the main menu “File &gt;&gt; New &gt;&gt;
Project from existing sources …”;

Select the directory created by the previous maven command in the
directory tree and click “OK”;

Select “Import project from external model &gt;&gt; Maven” and click
“Next”;

Besides the default options choose “Keep project files in:”, “Import
Maven projects automatically” and “Automatically download: sources”
options and always click “Next” until “Finish”;

Create project source folder
----------------------------

On the (left) project panel you should see “servlet25-example”. Navigate
to “src\\main” folder and create a folder “java”;

Right click on the “java” folder and select “Mark Directory as …
&gt;&gt; Sources Root” from the context menu. The directory should be
marked in blue now;

Create package
--------------

Right click on the directory “java” and choose “New &gt;&gt; Package”.
Name it “com.example.servlet25” and click “OK”;

Create servlet class file
-------------------------

Right click on the “com.example.servlet25” package and choose “New
&gt;&gt; Java Class”. Name it “HelloWorldServlet” and click “OK”;

Import dependencies
-------------------

Open the “pom.xml” file and add the following to the
“&lt;dependencies&gt;” element:

<pre><code>
&lt;dependency&gt;

    &lt;groupId&gt;javax.servlet&lt;/groupId&gt;

    &lt;artifactId&gt;servlet-api&lt;/artifactId&gt;

    &lt;version&gt;2.5&lt;/version&gt;

&lt;/dependency&gt;
</code></pre>

Save the file. The dependency should be automatically downloaded and
added to the “External Libraries” section on the project panel;

Configure the “web.xml” file for the servlet 2.5 version
--------------------------------------------------------

Open the file “src\\webapp\\WEB-INF\\web.xml” and replace its contents
with the following:

<pre><code>
&lt;web-app xmlns="http://java.sun.com/xml/ns/javaee"

         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee

         http://java.sun.com/xml/ns/javaee/web-app\_2\_5.xsd"

         version="2.5"&gt;

&lt;/web-app&gt;
</code></pre>

Save the file.

Creating the servlet definition:
--------------------------------

Inside the “web-app” element add the following:

<pre><code>
&lt;servlet&gt;

    &lt;servlet-name&gt;HelloWorldServlet&lt;/servlet-name&gt;

    &lt;servlet-class&gt;com.example.servlet25.HelloWorldServlet&lt;/servlet-class&gt;

&lt;/servlet&gt;

<br/>

&lt;servlet-mapping&gt;

    &lt;servlet-name&gt;HelloWorldServlet&lt;/servlet-name&gt;

    &lt;url-pattern&gt;/helloworld&lt;/url-pattern&gt;

&lt;/servlet-mapping&gt;
</code></pre>

The “&lt;servlet-name&gt;” can be anything you want as long as it
matches between the “&lt;servlet&gt;” and “&lt;servlet-mapping&gt;”
definitions;

The “&lt;servlet-class&gt;” is the mapping for the class we have created
before in the package;

The “&lt;url-pattern&gt;” is the pattern the browser will recognize from
the URL;

Coding the “HelloWorldServlet” class
------------------------------------

Import the following packages on the top of the class:

<pre><code>
import java.io.\*;

import javax.servlet.\*;

import javax.servlet.http.\*;
</code></pre>

Define the class as extending from “HttpServlet” as follows:

<pre><code>

/**

 * HelloWorldServlet class

 */

public class HelloWorldServlet extends HttpServlet {

}
</code></pre>

Implement the class with the following code:

<pre><code>
@Override

public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

    // Set the response message's MIME type.

    response.setContentType("text/html;charset=UTF-8");

    // Allocate a output writer to write the response message into the network socket.

    PrintWriter out = response.getWriter();

    // Write the response message, in an HTML document.

    try {

        out.println("&lt;!DOCTYPE html&gt;"); // HTML 5

        out.println("&lt;html&gt;&lt;head&gt;");

        out.println("&lt;meta http-equiv='Content-Type' content='text/html; charset=UTF-8'&gt;");

        out.println("&lt;title&gt;Servlet 2.5 Example&lt;/title&gt;&lt;/head&gt;");

        out.println("&lt;body&gt;");

        out.println("&lt;h1&gt;Hello World!&lt;/h1&gt;"); // Prints "Hello, world!"

        // Set a hyperlink image to refresh this page

        out.println("&lt;a href='" + request.getRequestURI() + "'&gt;&lt;img src='images/return.gif'&gt;&lt;/a&gt;");

        out.println("&lt;/body&gt;&lt;/html&gt;");

    } finally {

        out.close(); // Always close the output writer

    }

}
</code></pre>

Running the Web Application
---------------------------

Right click on “src\\main\\webapp\\index.jsp” and choose “Run
index.jps”. IntelliJ will create an automatic configuration for you
given you have Apache Tomcat already configured as your application
server inside IntelliJ;

The following address will be opened in your default browser:
[*http://localhost:8080/index.jsp*](http://localhost:8080/index.jsp).
Change it to
[*http://localhost:8080/helloworld*](http://localhost:8080/helloworld)
and press the “enter” key;

You should be now seeing the response given by the servlet: “Hello
World!” (and a broken image below).

Debugging the Web Application
-----------------------------

Place a breakpoint inside the “doGet” method inside your
“HelloWorldServlet” class anywhere you want. On the right upper corner
of the IntelliJ IDE window click on the green bug icon instead of the
green play icon to run the application in debug mode. Navigate to the
[*http://localhost:8080/helloworld*](http://localhost:8080/helloworld)
and you should hit the breakpoint you placed before.


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
