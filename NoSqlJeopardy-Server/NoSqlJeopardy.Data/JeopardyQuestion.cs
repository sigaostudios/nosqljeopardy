using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoSqlJeopardy.Data
{
    public class JeopardyQuestion
    {
        public string Id { get; set; }
        public int ShowNumber { get; set; }
        public DateTime AirDate { get; set; }
        public string Round { get; set; }
        public string Category { get; set; }
        public string Value { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }

    }
}
