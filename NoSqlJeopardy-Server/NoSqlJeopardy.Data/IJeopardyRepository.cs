using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoSqlJeopardy.Data
{
    public interface IJeopardyRepository
    {
        string EndpointUri { get; set; }
        string PrimaryKey { get; set; }
        string DatabaseName { get; set; }
        string Collection { get; set; }
        DocumentClient Client { get; set; }

        Task CreateDocumentClient();
        IEnumerable<JeopardyQuestion> GetQuestionsFromCsv(string file);
        Task SaveQuestionToDocDb(JeopardyQuestion question);

        IEnumerable<JeopardyQuestion> GetQuestionsForGameAndRound(int gameNumber, string round);
        IEnumerable<string> GetRoundValues();

    }
}
