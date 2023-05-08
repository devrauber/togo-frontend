const arrayDeObjetos = <any>[];
const latitudeSCS = -29.713672;
const longitudeSCS = -52.428482;
const offset = 0.005;

for (let i = 1; i <= 7; i++) {
  const id = i;
  const title = `Título ${i}`;
  const shotDescription = `Descrição curta ${i}`;
  const latitude = latitudeSCS + (Math.random() * offset * 3 - offset);
  const longitude = longitudeSCS + (Math.random() * offset * 3 - offset);
  const img = require(`../mocks/imagem-${5}.jpg`);
  arrayDeObjetos.push({ id, title, shotDescription, latitude, longitude, img });
}

export default arrayDeObjetos;
