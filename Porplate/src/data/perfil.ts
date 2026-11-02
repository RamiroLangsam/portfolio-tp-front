
export type Perfil = {
    nombre: string;
    bio: string;
    redes: {
      github: string;
      linkedin: string;
      instagram: string;
    };
  };
  
  export const perfilInicial: Perfil = {
    nombre: "Tu nombre",
    bio: "Soy desarrollador web y estos son mis proyectos.",
    redes: {
      github: "",
      linkedin: "",
      instagram: ""
    }
  };
  