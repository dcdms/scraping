const units = [
  "banhado grande", "apa delta do jacui", "rota do sol", "aratinga", "espigao alto", "itapeva",
  "itapua", "pe delta do jacui", "camaqua", "espinilho", "ibitiria", "papagaio charao", "podocarpus",
  "tainhas", "turvo", "quarta colonia", "banhado do macarico", "banhado dos pachecos", "rb serra geral",
  "ibicui mirim", "ibirapuita", "mato grande", "sao donato", "mata paludosa", "lagoa verde", "corredores de biodiversidade de canela",
  "lagoa itapeva", "morro de osorio", "morro ferrabraz", "aracuri esmeralda", "taim", "canela",
  "passo fundo", "sao francisco de paula", "capao da amizade", "sanga da alemoa", "lagoa do peixe",
  "pn serra geral", "aparados da serra", "banhado da imperatriz", "cascata do salso", "ronda",
  "sertao", "apertado", "pampa", "morros", "pinheiros", "logemann", "manuel de barros pereira",
  "morro jose lutzenberger", "saint hilaire", "ilha dos lobos", "molhe leste", "biopampa", "darwin joao geremia",
  "lami jose lutzenberger", "bosque de canela", "chacara sananduva", "costa do serro", "unisc",
  "estancia santa izabel do bitui", "estancia santa rita", "farroupilha", "fazenda branquilho",
  "fazenda caneleira", "fazenda curupira", "fazenda das palmas", "fazenda espora de ouro",
  "fazenda morro de sapucaia", "granja sao roque", "jardim da paz", "mariana pimentel", "mata do professor baptista",
  "minas do paredao", "o bosque", "pontal da barra", "posse dos franciosi", "pro mata", "rancho mira serra",
  "recanto do robalo", "reserva do capao grande", "reserva dos mananciais", "reserva do maragato",
  "reserva particular professor delmar harry dos reis", "reserva particular schuster",
  "rincao das flores", "ronco do bugio", "santa barbara", "sitio porto da capela", "solar das borboletas",
  "universidade de passo fundo", "boa vista", "estadual barba", "estadual moa", "estadual passo do buraco",
  "estadual salto forqueta"
].toReversed()

function searchURL(unit: string) {
  return `https://www.google.com.br/search?sca_esv=cf4b4f72d6e342aa&sxsrf=ADLYWIKBkgEWg6keYvfLaEpj6JSVD__Bag:1733230321770&q=paisagens+rio+grande+do+grande+do+sul+${unit.replaceAll(' ', '+')}&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J3ppPdoHI1O-XvbXbpNjYYxy9nF8_reHIdIO9ZF-Un9ci1-LWsJ8u77b8cWxASa3pFiyhPNiKaWzk1D1EuqM65L0P-s4UqyVnFNPCENlcb9d8imfGlpDOYD3ZJkbNJADhtj5UXIaTZQd9Tl9L-XGLXtFqA6lxGNqjf-5QQh6yj0j_iXpPQ&sa=X&ved=2ahUKEwj3k5KN0ouKAxUlNTUKHbkqInUQtKgLegQIHBAB&cshid=1733230333066318&biw=1495&bih=791&dpr=1.25`
}

const selector = 'div[jsslot] > div > g-img > img'

context('images.google.com', () => {
  it('download unit images', () => {
    units.forEach((unit) => {
      cy.visit(searchURL(unit))
      
      cy.get(selector).then((images) => {
        const sources: string[] = []

        images.slice(3, 5).each((_, el) => {
          sources.push(el.src)
        })

        sources.forEach((src, i) => {
          const path = 'cypress/downloads/' 
            + unit.replaceAll(' ', '-') 
            + '-' 
            + (i + 4)
            + '.jpg'
          
          const base64 = src.split(',')[1]
          cy.writeFile(path, base64, 'base64');
        })
      })
    })
  })  
})
