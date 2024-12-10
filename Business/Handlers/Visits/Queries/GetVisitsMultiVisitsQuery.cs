using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Business.Handlers.Visits.Queries
{
	public class GetVisitsMultiVisitsQuery : IRequest<IDataResult<List<VisitMultiVisitMergeDto>>>
	{
		public string Date { get; set; }

		public GetVisitsMultiVisitsQuery(string date)
		{
			Date = date;
		}

		public class GetVisitsMultiVisitsQueryHandler : IRequestHandler<GetVisitsMultiVisitsQuery, IDataResult<List<VisitMultiVisitMergeDto>>>
		{
			private readonly IVisitRepository _visitRepository;

			public GetVisitsMultiVisitsQueryHandler(IVisitRepository visitRepository)
			{
				_visitRepository = visitRepository;
			}

			public async Task<IDataResult<List<VisitMultiVisitMergeDto>>> Handle(GetVisitsMultiVisitsQuery request, CancellationToken cancellationToken)
			{
				// Gelen tarih stringini doğrula
				DateTime parsedDate;
				if (!DateTime.TryParseExact(request.Date, "dd-MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
				{
					return new ErrorDataResult<List<VisitMultiVisitMergeDto>>("Geçersiz tarih formatı");
				}

				// Visit ve MultiVisiters birleştirilmiş listesini al
				var mergedVisits = await _visitRepository.VisitMultiVisitMergeList(request.Date);

				// Eğer sonuç bulunamadıysa, hata mesajı döndür
				if (mergedVisits == null || !mergedVisits.Any())
				{
					return new ErrorDataResult<List<VisitMultiVisitMergeDto>>("Kayıt bulunamadı");
				}

				return new SuccessDataResult<List<VisitMultiVisitMergeDto>>(mergedVisits, "Başarıyla getirildi");
			}
		}
	}
}
