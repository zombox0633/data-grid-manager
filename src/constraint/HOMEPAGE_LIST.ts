type HomePageType = {
  SectionId: string
  imageUrl: string
  imageName:string
  article?:string
}

export const HOMEPAGE_LIST:Readonly<HomePageType[]> = [
  {
    SectionId: "A1",
    imageUrl:
      "https://images.unsplash.com/photo-1612487528505-d2338264c821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    imageName: "#A1",
    article: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
    optio animi facilis quis. Reprehenderit dolore inventore similique
    molestiae nulla, omnis rerum ut architecto tempore commodi esse
    consequatur aliquam eaque? Modi?`,
  },
  {
    SectionId: "A2",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1144&q=80",
    imageName: "#A2",
    article: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
    optio animi facilis quis. Reprehenderit dolore inventore similique
    molestiae nulla, omnis rerum ut architecto tempore commodi esse
    consequatur aliquam eaque? Modi?`,
  },
  {
    SectionId: "A3",
    imageUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    imageName: "#A3",
    article: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
    optio animi facilis quis. Reprehenderit dolore inventore similique
    molestiae nulla, omnis rerum ut architecto tempore commodi esse
    consequatur aliquam eaque? Modi?`,
  },
];
