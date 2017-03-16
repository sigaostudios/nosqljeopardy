using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoSqlJeopardy.Api.Options
{
    public class NSJDocumentDbSettings
    {
        public string EndpointUri { get; set; }
        public string PrimaryKey { get; set; }
        public string Collection { get; set; }
        public string DatabaseName { get; set; }
    }
}
