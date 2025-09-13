
const blog = document.getElementById('blog');
const showBlog = document.getElementById('blogBtn');
const rules = document.getElementById('rules');
const showRules = document.getElementById('rulesBtn');
const clsBlog = document.getElementById('closeBlog');
const clsRules = document.getElementById('closeRules');

// Event Listeners
// Rules and blog
showBlog.addEventListener('click', function() {
    blog.classList.remove('hidden');
})

showRules.addEventListener('click', function() {
    rules.classList.remove('hidden');
})

clsBlog.addEventListener('click', function() {
    blog.classList.add('hidden');
})

clsRules.addEventListener('click', function() {
    rules.classList.add('hidden');
})

