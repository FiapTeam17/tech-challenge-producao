Feature: Pedidos - Produção
  Scenario Outline: Valida nome do status
    Given os dados <body>
    When é enviado para "/pedidos/2/status"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'Status deve ser informado' |
      | '{"status":"RECEBIDO"}' | '200'  | '' |
      | '{"status":"TESTE"}'    | '500'  | 'Status Inválido' |
      | '{"status":""}'         | '500'  | 'Status Inválido' |
      | '{"status":"RECEBIDO"}' | '400'  | 'O status do pedido não permite essa alteração' |

  Scenario Outline: Valida retorno dos pedidos em andamento
    When é enviado para GET "/pedidos/andamento"
    Then status do retorno é <status>
    And a quantidade de registros retornados é <qtd>

    Examples:
      | campo          |   valor           | status | mensagem | qtd |
      | 'id'           |   RECEBIDO        | '200'  | ''       | 2   |

  Scenario Outline: Valida retorno dos pedidos
    When é enviado para GET "/pedidos/obterPedidos"
    Then status do retorno é <status>
    And a quantidade de registros retornados é <qtd>

    Examples:
      | campo          |   valor           | status | mensagem | qtd |
      | 'id'           |   RECEBIDO        | '200'  | ''       | 4   |

  Scenario Outline: Receber pedido do módulo de pedido
    Given os dados <body>
    When é criado um novo registro para "/pedidos/receberPedido"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{"observacao": "Sem cebola","dataCadastro": "2024-01-25 02:22:49","status": 0,"identificacaoPedido": "98776755454","id": 21,"itens": [{"quantidade": 1,"produtoId": 1,"nomeProduto": "Coca"}]}' | '201'  | ''                  |