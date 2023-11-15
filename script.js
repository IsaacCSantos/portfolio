const repositores = document.querySelector('#cartoes-projeto')

function getApiGitHub(){
  fetch('https://api.github.com/users/IsaacCSantos/repos').then(async res => {
    if(!res.ok){
      throw new Error(res.status);
    }

    var data = await res.json();

    data.map( item => {

      let project = document.createElement('div');
      let descricao = item.description !== null && item.description !== undefined ? item.description : '';
      let language = '';
      
      if (item.language !== null && item.language !== undefined){
        language = 
          `<div id="linguagem">
          <img class="circle" src="./assets/Ellipse 2.svg"/>
          <p>${item.language}</p>
          </div>`
      }

      project.innerHTML = `
        <div id="cartao-projeto" class="card">
          <div id="projeto-titulo">
            <div id="titulo">
                <img src="./assets/folder.svg"/> 
                <a href="${item.html_url}" target="_blank">${ item.name}</a>
            </div>
            <div class="data">${ Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</div>
          </div>
          <p>${descricao}</p>
          <div id="cartao-projeto-info">
              <div id="cartao-projeto-info-icon">
                  <img src="./assets/star.svg"/> 
                  <p>${item.stargazers_count}</p> 
                  <img src="./assets/git-branch.svg"/> 
                  <p>${item.forks_count}</p>
              </div>
              ${language}
          </div>
        </div>
      `

      repositores.appendChild(project);
    })

  }).catch(e => console.log(e))
}

getApiGitHub()