const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.likes
  }, 0)
}

const favorite = (blogs) => {
  const biggest_like = blogs.reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue.likes)
  }, 0)

  const { title, author, likes } = blogs.find ((blog) => {
    return blog.likes === biggest_like
  })

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map( blog => blog.author)
  const unique_authors = {}

  const authors_set = new Set(authors)

  authors_set.forEach(element => {
    unique_authors[element] = 0
  })

  for (let key in unique_authors){
    authors.forEach(element => {
      if (element === key){
        unique_authors[key]++
      }
    })
  }

  const max_blogs= Object.values(unique_authors).reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue)
  }, 0)

  const most_author = Object.entries(unique_authors).find ((author) => {
    return author[1] === max_blogs
  })

  return { author: most_author[0], blogs: most_author[1] }

}

const mostLikes = (blogs) => {
  const unique_authors = {}

  const authors_set = new Set(blogs.map( blog => blog.author))

  authors_set.forEach(element => {
    unique_authors[element] = 0
  })

  for (let key in unique_authors){
    blogs.forEach(blog => {
      if (blog.author === key){
        unique_authors[key]+=blog.likes
      }
    })
  }

  const max_likes= Object.values(unique_authors).reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue)
  }, 0)

  const most_author = Object.entries(unique_authors).find ((author) => {
    return author[1] === max_likes
  })

  return { author: most_author[0], likes: most_author[1] }

}

module.exports = {
  dummy, totalLikes, favorite, mostBlogs, mostLikes
}