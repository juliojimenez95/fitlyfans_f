import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class HomePage {
  workoutCategories = [
    {
      title: "Energía Matutina",
      image: "assets/images/energia-matutina.jpg",
      color: "linear-gradient(135deg, #4CAF50, #2E7D32)",
    },
    {
      title: "Relajación Nocturna",
      image: "assets/images/relajacion-nocturna.jpg",
      color: "linear-gradient(135deg, #3F51B5, #1A237E)",
    },
    {
      title: "Full Body Intenso",
      image: "assets/images/full-body.jpg",
      color: "linear-gradient(135deg, #212121, #000000)",
    },
    {
      title: "Brazos y Espalda",
      image: "assets/images/brazos-espalda.jpg",
      color: "linear-gradient(135deg, #212121, #000000)",
    },
  ]

  recommendedWorkouts = [
    {
      title: "Power HIIT",
      duration: "5 h",
      image: "assets/images/power-hiit.jpg",
      color: "linear-gradient(135deg, #212121, #000000)",
    },
    {
      title: "10 reps",
      intensity: "8/10",
      image: "assets/images/reps.jpg",
      color: "linear-gradient(135deg, #212121, #000000)",
    },
  ]

  constructor() {}
}

export default HomePage
