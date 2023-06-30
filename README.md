# Backend com NestJS + Apache Kafka + postgres


1. Sistema para vendas de infoprodutos:

Infoprodutos é um tipo de produto digital que geralmente ensina o usuário a fazer alguma coisa. O infoproduto que vamos vender é um curso, que garante ao usuário 1 mês de acesso a uma plataforma e acesso a todos os vídeos do curso.

Produto 1 a ser vendido deverá ter o ID 123456, e liberar as seguintes roles por 1 mês: PREMIUM_USER, COURSE_XYZ

Produto 2 a ser vendido deverá ter o ID 987654, e liberar as seguintes roles por 1 mês: PREMIUM_USER, COURSE_ABCD

Essa API precisa ter 1 endpoint que respeite a venda de 1 produto a 1 usuário utilizando o seguinte JSON de exemplo como entrada:

{
  "serviceKey": "318440fb7491",
  "buyerEmail": "any@email.com",
  "productId": "123456",
}



Essa API precisa ter 1 endpoint que respeite o cancelamento de 1 infoproduto, respeitando o seguinte JSON de exemplo como entrada:

{
  "serviceKey": "318440fb7491",
  "buyerEmail": "any@email.com",
  "productId": "123456",
}

Após a venda ser concluída ou cancelada, o sistema de vendas deverá comunicar o sistema de gerenciamento de usuários e acessos, e o mesmo deverá decidir a ação a ser tomada sobre o usuário especificado.


2. Sistema para gerenciamento de usuários e acessos:

Esse serviço deverá ser responsável por gerenciar os usuários do sistema, deverá gerenciar também os papéis (Role)  exercidos por cada usuário.

Será analisado como o candidato propõe uma solução para casos onde o usuário compre mais de um infoproduto ou infoprodutos que dão roles repetidas, cancelamento de infoprodutos, etc.

Após um usuário iniciar ou terminar o exercício de uma Role, os sistemas interessados deverão ser comunicados.


3.Sistema de cursos:

Esse sistema é onde o usuário tem acesso a uma plataforma especial, que só pode ser acessada quando ele possui a role PREMIUM_USER; Também é onde ele vê os vídeos do curso adquirido.

Ele é um sistema que deverá ser notificado quando o usuário ganhar ou perder uma role.

Não é necessário que nenhuma feature seja implementada aqui, somente o tratamento das notificações;



