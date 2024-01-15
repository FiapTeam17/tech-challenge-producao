Feature: Obter Pedidos Por Status
  Scenario: Valida nome do status
    When é enviado o nome do status incorreto do "/pedidos"
    Then status do retorno é "500"
    And a mensagem de retorno é "Status Inválido"
  Scenario: Valida status undefined
    When é enviado vazio no nome do status do "/pedidos"
    Then status do retorno é "400"
    And a mensagem de retorno é "Status deve ser informado"
