
## Worker-Java

The Worker-Java executes the provided Java code at the remote worker. Note the
class name must be the same as the action name. More information about the
worker at: https://github.com/apioo/fusio-worker-java

### Example

```java
import org.fusioproject.worker.ActionAbstract;
import org.fusioproject.worker.Connector;
import org.fusioproject.worker.Dispatcher;
import org.fusioproject.worker.Logger;
import org.fusioproject.worker.generated.Context;
import org.fusioproject.worker.generated.Request;
import org.fusioproject.worker.generated.Response;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MyJavaAction extends ActionAbstract {

    public MyJavaAction(Connector connector, Dispatcher dispatcher, Logger logger) {
        super(connector, dispatcher, logger);
    }

    public Response handle(Request request, Context context) throws Exception {

        Connection connection = (Connection) this.connector.getConnection("my_db");
        Statement stmt = connection.createStatement();
        ResultSet result = stmt.executeQuery("SELECT * FROM app_todo");

        List<HashMap<String, String>> rows = new ArrayList<HashMap<String, String>>();
        while (result.next()) {
            HashMap<String, String> row = new HashMap<String, String>();
            row.put("id", result.getString(1));
            row.put("title", result.getString(3));
            rows.add(row);
        }

        HashMap<String, Object> body = new HashMap<String, Object>();
        body.put("hello", "foobar");
        body.put("result", rows);

        return this.response.build(200, null, body);

    }

}
```
