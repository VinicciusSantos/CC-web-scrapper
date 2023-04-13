# Cookies

## 1️⃣ Ao entrar pela primeira vez
Os cookies de FGTServer, JSESSIONID e s_session_id são preenchidos

```
FGTServer = ABF2E76C290F9F211F50C1A1F2D59A54EDE93A7B9D9BD11CA5EB54081731B7C270A08A57C39;
JSESSIONID =	C0B030BF2C3503336E95E5025D207149; 
BbClientCalenderTimeZone = America/Fortaleza	
s_session_id = 78CBE0D24FD370A9730ADEA47F1C9754
```

## 2️⃣  https://ava.ead.unip.br/webapps/login/

### Resumo
- O FGTServer não é usado
- JSESSIONID é usado
- s_session_id é usado e modificado

### Header Request (Cookie)
```
s_session_id=78CBE0D24FD370A9730ADEA47F1C9754; BbClientCalenderTimeZone=America/Fortaleza; JSESSIONID=C0B030BF2C3503336E95E5025D207149
```

### Header Response (Set-Cookie) 
```
s_session_id=B2F28955C1817172E22BBB3CA0E7BE27; Path=/; Secure; HttpOnly
Vary: Origin
```

## 3️⃣ https://ava.ead.unip.br/webapps/portal/execute/defaultTab

### Resumo:
- O mesmo JSESSIONID é usado desde o começo até agora
- É usado o s_session_id da requisição anterior (login), e dessa vez, ele não é modificado

### Header Request (Cookie) 
```
BbClientCalenderTimeZone=America/Fortaleza; JSESSIONID=C0B030BF2C3503336E95E5025D207149; s_session_id=B2F28955C1817172E22BBB3CA0E7BE27

```

### Header Response (Set-Cookie) 
```
s_session_id=B2F28955C1817172E22BBB3CA0E7BE27; Path=/; Secure; HttpOnly
```

## 4️⃣ : https://ava.ead.unip.br/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_10_1
### Resumo:
- O JSESSIONID que era usado desde o começo é modificado 

### Header Request (Cookie) 
```
BbClientCalenderTimeZone=America/Fortaleza; 
JSESSIONID=C0B030BF2C3503336E95E5025D207149; 
s_session_id=B2F28955C1817172E22BBB3CA0E7BE27
```

### Header Response (Set-Cookie) 
```
 s_session_id=B2F28955C1817172E22BBB3CA0E7BE27; Path=/; Secure; HttpOnly
```
```
JSESSIONID=AA106B8AD740E465FD51D5407AB042EF; Path=/webapps/portal; Secure
```

## Ao Final
```
JSESSIONID	636E5D1AD1FC444B02EBA57313D64760
FGTServer	ABF2E76C290F9F211F50C1A1F2D59A54EDE93A7B9D9BD11CA5EB54081731B7C270A08A40C39C
1️⃣ FGTServer	ABF2E76C290F9F211F50C1A1F2D59A54EDE93A7B9D9BD11CA5EB54081731B7C270A08A57C39C
FGTServer	ABF2E76C290F9F211F50C1A1F2D59A54EDE93A7B9D9BD11CA5EB54081731B7C270A08A54C39C
web_client_cache_guid	19ff6f59-84f4-4478-9176-1c955b033c1b
2️⃣3️⃣4️⃣  s_session_id	B2F28955C1817172E22BBB3CA0E7BE27
1️⃣2️⃣3️⃣ JSESSIONID	C0B030BF2C3503336E95E5025D207149
BbClientCalenderTimeZone	America/Fortaleza
FGTServer	ABF2E76C290F9F211F50C1A1F2D59A54EDE93A7B9D9BD11CA5EB54081731B7C270A08AB0C39C
4️⃣JSESSIONID	AA106B8AD740E465FD51D5407AB042EF
```