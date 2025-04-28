document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault();
        fetchUser(e.target.search.value);
    });
})

function fetchUser(search) {
    fetch(`https://api.github.com/search/users?q=${search}`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then(res => res.json())
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.textContent = "";

            data.items.forEach(element => {
                const li = document.createElement("li");
                li.textContent = `name: ${element.login}, avatar: ${element.avatar_url}, url: ${element.url}`;
                li.addEventListener("click", () => fetchRepos(element.login));
                userList.appendChild(li);

            });
        });
}

function fetchRepos(user) {
    fetch(`https://api.github.com/search/repositories?q=user:${user}`)
        .then(res => res.json())
        .then(data => {
            const reposList = document.getElementById("repos-list");
            reposList.textContent = "";
            console.log(data);


            data.items.forEach(element => {
                const li = document.createElement("li");
                li.textContent = element.html_url;
                reposList.appendChild(li);

            });
        });
}