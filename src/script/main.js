window.addEventListener('load', () => {

    const inputBorder = document.getElementById("form-input-line");
    const rightForm = document.getElementById('form-right');

    const formRightBorder = document.getElementById('form-right-border');
    const formLeftBorder = document.getElementById('form-left-border');
    const formTopBorder = document.getElementById('form-top-border');
    const formBottomBorder = document.getElementById('form-bottom-border');
    const userForm = document.getElementById('user-form');
    const usersList = document.getElementById('list');
    const warningPopup = document.getElementById('warning');
    const loader = document.getElementById('loader');

    inputBorder.style.width = "100%";


    rightForm.addEventListener("mouseover", () => {
        formLeftBorder.style.transform = "translateY(100%)";
        formRightBorder.style.transform = "translateY(-100%)";
        formTopBorder.style.transform = "translateX(0)";
        formBottomBorder.style.transform = "translateX(0)";

    });

    rightForm.addEventListener("mouseleave", () => {
        formLeftBorder.style.transform = "translateY(0)";
        formRightBorder.style.transform = "translateY(0)";
        formTopBorder.style.transform = 'translateX(100%)';
        formBottomBorder.style.transform = 'translateX(-100%)';

    });

    userForm.addEventListener('submit', (event) => {
        const userLogin = document.getElementById('loginInput').value;
        if (userLogin !== '') {
            loader.style.display = "flex";
            event.preventDefault();
            axios.get(`https://api.github.com/users/${userLogin}`)
                .then(response => {
                    loader.style.display = "none";
                    const {login, public_repos, followers, avatar_url, url} = response.data;
                    const element = `
                    <li>
                        <img src="${avatar_url}"/>
                        <hr />
                        <h3>login: ${login}</h3>
                        <h3>url: ${url}</h3>
                        <h3>public repos: ${public_repos}</h3>
                        <h3>followers: ${followers}</h3>
                    </li>
                `;

                    usersList.innerHTML += element;
                })
                .catch(err => {
                    loader.style.display = "none";
                    warningPopup.style.transform = 'translateY(0px)';

                    window.setTimeout(() => {
                        warningPopup.style.transform = 'translateY(-100%)';
                    }, 3000)
                })
        } else {
            // loader.style.display = "none";
            event.preventDefault();
            inputBorder.style.backgroundColor = "#e85e6c";
        }
    });

});
