using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Newtonsoft.Json;
using NoSqlJeopardy.Data;
using System.Threading;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace QuestionLoader
{
    public class Program
    {
        public static IConfigurationRoot Configuration;

        public static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", true, true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            var repo = new JeopardyRepository();

            //Configure repository
            var docDbConfig = Configuration.GetSection("DocumentDB");
            repo.Collection = docDbConfig["Collection"];
            repo.DatabaseName = docDbConfig["DatabaseName"];
            repo.EndpointUri = docDbConfig["EndpointUri"];
            repo.PrimaryKey = docDbConfig["PrimaryKey"];

            try
            {
                repo.CreateDocumentClient().Wait();
            }
            catch (DocumentClientException de)
            {
                Exception baseException = de.GetBaseException();
                Console.WriteLine("{0} error occurred: {1}, Message: {2}", de.StatusCode, de.Message, baseException.Message);
            }
            catch (Exception e)
            {
                Exception baseException = e.GetBaseException();
                Console.WriteLine("Error: {0}, Message: {1}", e.Message, baseException.Message);
            }

            //Read CSV
            Console.WriteLine("Reading CSV File");
            var csvQuestions = repo.GetQuestionsFromCsv(@".\Questions\jeopardy_csv.csv");
            Console.Write("Read {0} questions.", csvQuestions.Count());

            foreach(var question in csvQuestions)
            {
                repo.SaveQuestionToDocDb(question);
                Thread.Sleep(100);
                Console.WriteLine("Saving: {0}", question.Question);
            }

            Console.WriteLine("End of demo, press any key to exit.");
            Console.ReadKey();

        }
    }
}
