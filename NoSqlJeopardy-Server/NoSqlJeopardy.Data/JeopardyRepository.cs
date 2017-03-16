using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using CsvHelper;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents;
using System.Net;

namespace NoSqlJeopardy.Data
{
    
    public class JeopardyRepository : IJeopardyRepository
    {
        public string EndpointUri { get; set; }
        public string PrimaryKey { get; set; }
        public string DatabaseName { get; set; }
        public string Collection { get; set; }
        public DocumentClient Client { get; set; }      

        public async Task CreateDocumentClient()
        {
            Client = new DocumentClient(new Uri(EndpointUri), PrimaryKey);
            // Check to verify a database with the id=DatabaseName does not exist
            try
            {
                await Client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(DatabaseName));                
            }
            catch (DocumentClientException de)
            {
                // If the database does not exist, create a new database
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await Client.CreateDatabaseAsync(new Database { Id = DatabaseName });
                }
                else
                {
                    throw;
                }
            }

            try
            {
                await Client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(DatabaseName, Collection));                
            }
            catch (DocumentClientException de)
            {
                // If the document collection does not exist, create a new collection
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    DocumentCollection collectionInfo = new DocumentCollection();
                    collectionInfo.Id = Collection;

                    // Configure collections for maximum query flexibility including string range queries.
                    collectionInfo.IndexingPolicy = new IndexingPolicy(new RangeIndex(DataType.String) { Precision = -1 });

                    // Here we create a collection with 400 RU/s.
                    await Client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(DatabaseName),
                        collectionInfo,
                        new RequestOptions { OfferThroughput = 1500 });                    
                }
                else
                {
                    throw;
                }
            }
        }

        public IEnumerable<JeopardyQuestion> GetQuestionsFromCsv(string file)
        {
            using (StreamReader fileReader = File.OpenText(file))
            {
                using (CsvReader csvReader = new CsvReader(fileReader))
                {
                    var records = csvReader.GetRecords<JeopardyQuestion>().ToList();
                    return records;
                }
            }
        }

        public async Task SaveQuestionToDocDb(JeopardyQuestion question)
        {
            try
            {
                await Client.ReadDocumentAsync(UriFactory.CreateDocumentUri(DatabaseName, Collection, question.Id));
            }
            catch (DocumentClientException de)
            {
                if (de.StatusCode == HttpStatusCode.NotFound)
                {
                    await Client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(DatabaseName, Collection), question);                    
                }
                else
                {
                    throw;
                }
            }
        }

        public IEnumerable<JeopardyQuestion> GetQuestionsForGameAndRound(int gameNumber, string round)
        {
            FeedOptions queryOptions = new FeedOptions { MaxItemCount = 100 };
            IQueryable<JeopardyQuestion> jeopardyQuery = Client.CreateDocumentQuery<JeopardyQuestion>(
                    UriFactory.CreateDocumentCollectionUri(DatabaseName, Collection), queryOptions)
                    .Where(q => q.ShowNumber == gameNumber && q.Round == round);
            return jeopardyQuery.ToList<JeopardyQuestion>();
        }

        public IEnumerable<string> GetRoundValues()
        {
            List<string> roundValues = new List<string>();
            roundValues.Add("Jeopardy!");
            roundValues.Add("Double Jeopardy!");
            roundValues.Add("Final Jeopardy!");
            return roundValues;
        }
    }
}
