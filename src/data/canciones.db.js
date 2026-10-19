export let canciones =[
    {
        id: 1,
        titulo: "Mi Suerte",
        autor: "Morat",
        duracion: "03:33"
    }, 
    {
        id: 2,
        titulo: "Bones",
        autor: "Imagine Dragon",
        duracion: "02:45"
    }, 
    {
        id: 3,
        titulo: "Mi gran amor",
        autor: "Jorge Cuellar",
        duracion: "04:25"
    }, 
    {
        id: 4,
        titulo: "Love Yourself",
        autor: "Justin Bieber",
        duracion: "03:56"
    }, 
]

export function ReiniciarPlaylist(){
        canciones.length = 0;
canciones.push(
      {
        id: 1,
        titulo: "Mi Suerte",
        autor: "Morat",
        duracion: "03:33"
    }, 
    {
        id: 2,
        titulo: "Bones",
        autor: "Imagine Dragon",
        duracion: "02:45"
    }, 
    {
        id: 3,
        titulo: "Mi gran amor",
        autor: "Jorge Cuellar",
        duracion: "04:25"
    }, 
    {
        id: 4,
        titulo: "Love Yourself",
        autor: "Justin Bieber",
        duracion: "03:56"
    });
}


