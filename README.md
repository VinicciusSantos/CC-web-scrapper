# UNIP Web Scraper
![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Cheerio](https://img.shields.io/badge/-Cheerio-%23E33332?style=for-the-badge)
![Selenium](https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white)

Programa para uso pessoal com finalidade de fazer o download automaticamente de todos os arquivos disponíveis na plataforma online da faculdade. Este código foi desenvolvido para facilitar o processo de obtenção de materiais de estudo, como slides, apostilas, exercícios, entre outros, disponibilizados pelos professores no sistema online da universidade.


## Funcionalidades
O UNIP Web Scraper possui as seguintes funcionalidades:
- Fazer login automaticamente na plataforma online da UNIP com credenciais fornecidas pelo usuário.
- Navegar pelas disciplinas e unidades curriculares do curso do usuário.
- Baixar automaticamente todos os arquivos disponíveis em cada disciplina/unidade curricular.
- Organizar os arquivos baixados em pastas de acordo com a estrutura da plataforma UNIP.


## Navegando pelo sistema

### Tela principal
São exibidos todos os cursos que o usuário possui juntamente com suas respectivas notas em questionários, atividades e avaliações.
![homet](./docs/assets/layout-v2__home.png)

### Modal de Download
Permite ver todos os materias diponíveis na plataforma, incluindo vídeos, PDFs e páginas de questionários e atividades.
![modal](./docs/assets/layout-v2__modal.png)

Ao fazer download, os arquivos serão encontrados em `C:/UNIP-Web-Scrapper` na seguinte estrutura
![downloads](./docs/assets/dowloads_structure.png)

### Tela de login
São apresentados os campos de matricula e senha para fazer login no sistema.
OBS: as credenciais usadas para fazer login no sistema são as mesmas cadastradas no sistema da universidade
![homet](./docs/assets/layout-v2__login.png)

## Instruções para execução do projeto

1. Inicialize os containers
```bash
docker-compose up
```

2. acesse a URL no navegador
```
localhost:4200
````