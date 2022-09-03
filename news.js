loadCategory = () => {
  const url = 'https://openapi.programming-hero.com/api/news/categories'
  fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}

displayCategory = categories => {
  const categroyContainer = document.getElementById('category')
  categories.forEach(categroy => {
    const div = document.createElement('div')
    div.classList.add('d-inline')
    div.innerHTML = `
       <button class='btn border-0' onclick="categoryData(${categroy.category_id},'${categroy.category_name}')">${categroy.category_name}</button>`
    categroyContainer.appendChild(div)
  })
}

categoryData = (categoryId, categoryName) => {
  toggleSpiner(true)
  const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
  fetch(url)
    .then(res => res.json())
    .then(data => showCategoryNews(data.data, categoryName))
    .catch(error => console.log(error))
}

showCategoryNews = (categoryNews, categoryName) => {
  // item found counting 
  const newsFound = document.getElementById('news-found')
  newsFound.innerText = categoryNews.length
  // item found counting 
  const setCategroyName = document.getElementById('categroy-name')
  if (categoryName === undefined) {
    setCategroyName.innerText = 'All News'
  }
  else {
    setCategroyName.innerText = categoryName
  }
  // category name set 

  // category name set 

  // no found message show
  const noFound = document.getElementById('no-found')
  if (categoryNews.length === 0) {
    noFound.classList.remove('d-none')
  }
  else {
    noFound.classList.add('d-none')
  }
  // no found message show

  const newsContainer = document.getElementById('news-container')
  newsContainer.textContent = ''
  categoryNews.forEach(news => {
    const newsDiv = document.createElement('div');

    newsDiv.innerHTML = `
        <div class="card mt-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.image_url}" class="img-fluid rounded-start h-100" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.length > 200 ? news.details.slice(0, 200) + '...' : news.details}</p>
       <div class="d-flex justify-content-between align-items-center">
       <div>
       <img class="rounded-circle" style="width:60px" src="${news.author.img}"><span class="ps-2 fw-bold">${news.author.name ? news.author.name : 'no found author name'}</span>
       </div>
       <small class="fw-semibold"><img class="me-2 text-center" src="icion.png">${news.total_view ? news.total_view : "no found veiw"}</small>

       <button onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal"
       data-bs-target="#newsModals"><i class="fa-solid fa-arrow-right"></i></button>
       </div>
      </div>
    </div>
  </div>
</div>
        `;
    newsContainer.appendChild(newsDiv)
  })
  //  loader stop
  toggleSpiner(false)
}

// loader
const toggleSpiner = isLoader => {
  const loader = document.getElementById('loader')
  if (isLoader) {
    loader.classList.remove('d-none')
  }

  else {
    loader.classList.add('d-none')
  }
}
// loader

loadNewsDetails = (newsDetail) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsDetail}`
  fetch(url)
    .then(res => res.json())
    .then(data => showNewsDetail(data.data))
    .catch(error => console.log(error))
}

showNewsDetail = (newsDetail) => {
  const modal = document.getElementById('modal-data')
  modal.textContent = ''
  newsDetail.forEach(news => {
    console.log(news)
    const div = document.createElement('div')
    div.classList.add('modal-content')
    div.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="newsModalsLabel">${news.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
    <img class="w-100 img-fluid" src="${news.thumbnail_url}">
    <p class="mt-3">${news.details}</p>
    <div class="d-flex justify-content-between align-items-center">
    <div>
    <img class="rounded-circle" style="width:60px" src="${news.author.img}"><span class="ps-2 fw-bold">${news.author.name ? news.author.name : 'no found author name'}</span>
    </div>
    <small class="fw-semibold"><img class="me-2 text-center" src="icion.png">${news.total_view ? news.total_view : "no found veiw"}</small>
    <small class="fw-semibold">Rating: ${news.rating.number}<small>
    </div>
    
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
</div>
    `;
    modal.appendChild(div)
  })
}

loadCategory()
categoryData(8)