using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoSqlJeopardy.Data.ViewModels
{
    public class BoardCategoryVm
    {
        public string CategoryName { get; set; }
        public IEnumerable<QuestionVm> Questions { get; set; }
    }
}
