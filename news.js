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
      <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.length > 200 ? news.details.slice(0, 200) + '...' : news.details}</p>
      </div>
    </div>
  </div>
</div>
        `;
        newsContainer.appendChild(newsDiv)
    })
}

loadCategory()