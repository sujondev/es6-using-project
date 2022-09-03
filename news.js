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
       <button class='btn border-0' onclick="categoryData(${categroy.category_id})"> ${categroy.category_name}</button>
      `
        categroyContainer.appendChild(div)
    })
}

categoryData = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showCategoryNews(data.data))
        .catch(error => console.log(error))
}

showCategoryNews = (categoryNews) => {
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = ''
    categoryNews.forEach(news => {
        console.log(news);
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
       <button onclick="newsDetails()" class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button>
       </div>
      </div>
    </div>
  </div>
</div>
        `;
        newsContainer.appendChild(newsDiv)
    })
}



loadCategory()