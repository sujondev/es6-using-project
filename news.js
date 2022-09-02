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
    console.log(categoryId)
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showCategoryNews(data))
        .catch(error => console.log(error))
}

showCategoryNews = (categoryNews) => {
    console.log(categoryNews)
}

loadCategory()