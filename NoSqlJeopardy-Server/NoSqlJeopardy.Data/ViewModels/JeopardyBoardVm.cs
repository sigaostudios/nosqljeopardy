using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoSqlJeopardy.Data.ViewModels
{
    public class JeopardyBoardVm
    {
        public IEnumerable<BoardCategoryVm> Categories { get; set; }
    }
}
