class Blog {
    constructor() {
        console.log('blog start');
        this.setInitVariable();
        this.registerEvents();
        this.likedSet = new Set();
    }

    setInitVariable() {
        this.blogList = document.querySelector('.blogList > ul');
    }

    registerEvents() {
        const dataURL = "../data/data.json";
        const startBtn = document.querySelector('.start');

        startBtn.addEventListener('click', () => {
            this.setInitData(dataURL);
        });

        this.blogList.addEventListener('click', ({ target }) => {
            const className = target.className;
            const title = target.previousElementSibling? target.previousElementSibling.textContent : '';
            
            if (className === 'like') {
                this.likedSet.add(title);
                target.className = 'unlike';
                target.innerText = '취소';
            } else if (className === 'unlike') {
                this.likedSet.delete(title);
                target.className = 'like';
                target.innerText = '찜하기';
            } else {
                return;
            }

            this.updateLikedList();
        });
    }

    updateLikedList() {
        const likedList = document.querySelector('.like-list > ul');
        let likedSum = '';

        this.likedSet.forEach(v => {
            likedSum += `<li> ${v} </li>`;
        });

        likedList.innerHTML = likedSum;
    }

    setInitData(dataURL) {
        this.getData(dataURL, this.insertPosts.bind(this));
        // do somtething..
    }

    getData(dataURL, fn) {
        const oReq = new XMLHttpRequest();

        oReq.addEventListener('load', () => {
            const list = JSON.parse(oReq.responseText).body;
            fn(list);
        });

        oReq.open('GET', dataURL);
        oReq.send();
    }

    insertPosts(list) {
        list.forEach(v => {
            this.blogList.innerHTML += `
            <li>
                <a href=${v.link}>${v.title}</a>
                <div class="like">찜하기</div>
            </li>
            `;
        });
    }
}

export default Blog;