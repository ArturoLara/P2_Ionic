import { Component } from '@angular/core';
import {NavParams, Platform, PopoverController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FilmsService} from "./films.service";

@Component({
  templateUrl: 'app.html',
  providers: [FilmsService]
})
export class MyApp {
  rootPage:any = HomePage;
  public id: number;
  public name: string;
  public director: string;
  public stars: string;
  public year: number;
  public videoURL: string;
  public coverURL: string;
  public videoCode: SafeUrl;

  constructor(platform: Platform, private service: FilmsService, statusBar: StatusBar, splashScreen: SplashScreen, private secure:DomSanitizer, private popoverCtrl: PopoverController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  search(title: string) {
    this.service.getFilm(title).subscribe(
      success => (
        this.name = success['name'],
          this.director = success['director'],
          this.stars = success['stars'],
          this.year = success['year'],
          this.videoURL = success['videoURL'],
          this.coverURL = success['coverURL'],
          this.videoCode = this.secure.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/".concat(success['videoCode']))),
      error => console.error(error)
    );
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      codeVideo: this.videoCode
    });

    popover.present({
      ev: ev
    });
  }
}

@Component({
  templateUrl: 'popVideo.html'
})
export class PopoverPage {
  videoCode: SafeUrl;


  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.videoCode = this.navParams.data.codeVideo;
    }
  }


}

