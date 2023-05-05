# Video Downloader
Passo a passo para fazer o download de um video do azure media player no site da UNIP

1. Buscar o primeiro token e a URL da nova página
	- usar o "id", "u" e "d" dos query params da url original
    - ```const url = `https://sistemas.unip.br/centralsistemaservico/playerblack.ashx?u=${u}&d=${d}&id=${id}&instituto=ead` ```
	- após fazer a requisição GET nessa url, pegar o item "Location" no header da resposta
2. Buscar um segundo token para receber as VideoInfos
   - Usar o primeiro token na seguinte rota para fazer a requisição GET
   - ``` const url = `https://api.unip.br/sistemas/ava/servico/autenticacao/token/sepi/${primeiro_token}` ```
   - pegar o item "token" que vai ser enviado no response da requisição
3. Usar segundo token para descobri o link do manifest
   - ```const url = `https://api.unip.br/sistemas/ava/servico/video/transmissao/${primeiro_token}` ```
4. Fazer alterações no link do manifest e colocar no script