using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NoSqlJeopardy.Api.Options;
using NoSqlJeopardy.Data;
using NoSqlJeopardy.Data.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace NoSqlJeopardy.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private IJeopardyRepository _repo;
        public QuestionsController(IJeopardyRepository repo, IOptions<NSJDocumentDbSettings> settings)
        {
            _repo = repo;
            repo.EndpointUri = settings.Value.EndpointUri;
            repo.PrimaryKey = settings.Value.PrimaryKey;
            repo.DatabaseName = settings.Value.DatabaseName;
            repo.Collection = settings.Value.Collection;
            repo.CreateDocumentClient().Wait();
        }
        // GET: api/values
        [HttpGet]
        public JeopardyBoardVm Get([FromQuery]int showNumber, [FromQuery]string round)
        {
            JeopardyBoardVm board = new JeopardyBoardVm();

            var questions = _repo.GetQuestionsForGameAndRound(showNumber, round);
            var cats = (from c in questions
                        select c.Category).Distinct().ToList();

            var boardCategories = new List<BoardCategoryVm>();

            foreach (var cat in cats)
            {
                BoardCategoryVm bcat = new BoardCategoryVm();
                bcat.CategoryName = cat;
                var boardQuestions = new List<QuestionVm>();

                var qs = (from q in questions
                          where q.Category.Equals(cat)
                          orderby int.Parse(q.Value.Replace("$", "").Replace(",", ""))
                          select q).ToList();

                foreach(var q in qs)
                {
                    QuestionVm question = new QuestionVm();
                    question.Value = q.Value;
                    question.Question = q.Question;
                    question.Answer = q.Answer;
                    boardQuestions.Add(question);
                }
                bcat.Questions = boardQuestions;
                boardCategories.Add(bcat);
            }
            board.Categories = boardCategories;
            return board;
        }        
    }
}
