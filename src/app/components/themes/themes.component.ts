import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { Observable, combineLatest } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { ThemeState } from "../../shared/state/theme.state";
import { GetHomePage } from "../../shared/action/theme.action";
import { ThemeOptionService } from "../../shared/services/theme-option.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-themes",
  templateUrl: "./themes.component.html",
  styleUrls: ["./themes.component.scss"],
})
export class ThemesComponent implements OnInit, OnDestroy {
  @Select(ThemeState.homePage) homePage$: Observable<string>;
  @Select(ThemeState.activeTheme) activeTheme$: Observable<string>;

  public theme: string;
  public homePage: any;

  private destroy$ = new Subject<void>();
  public fixedCategoriesNames = [
    "Photography",
    "Accessories",
    "Videos",
    "More In Photography",
    "Lenses",
    "Drones",
  ];

  public categories = this.fixedCategoriesNames.map((data, index) => ({
    id: index + 1,
    name: data,
  }));

  public selectedCategory: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService
  ) {}

  ngOnInit() {
    document.body.classList.add("home");

    combineLatest([
      this.route.queryParams.pipe(map((params) => params["theme"])),
      this.activeTheme$,
    ])
      .pipe(
        map(([queryParamTheme, activeTheme]) => queryParamTheme || activeTheme),
        switchMap((themeSetting) => {
          this.themeOptionService.preloader = true;
          this.theme = themeSetting;
          return this.store.dispatch(new GetHomePage(themeSetting));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.homePage = data.theme.homePage;
        this.categories = data.category.category.data;
        console.log("data", this.categories)
        this.themeOptionService.preloader = false;
      });
  }

  ngOnDestroy() {
    document.body.classList.remove("home");
    this.destroy$.next();
    this.destroy$.complete();
  }

  highlightItem(item: any) {
    console.log("item clicked", item);
    this.selectedCategory = item;
  }
}
