const form = document.querySelector("#form");
const justDiv = document.querySelector("#justDiv");

let removeImg = () => {
    let images = justDiv.childNodes;
    let index = images.length - 1;
    if (index != 0) {
        while (index > 0) {
            images[index].remove();
            index--;
        }
    }
    console.log(images);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    removeImg();
    searchText = form.elements.search.value;
    let config = { params: { q: searchText } };
    axios.get(`https://api.tvmaze.com/search/shows`, config)
        .then(res => {
            for (i of res.data) {
                if (i.show.image) {
                    const justImg = document.createElement('img');
                    justImg.src = i.show.image.medium;
                    justDiv.append(justImg);
                    console.log(i.show.name);
                }
            }
            form.elements.search.value = "";
        })
        .catch(e => console.log("Match Not Found " + e));
})
