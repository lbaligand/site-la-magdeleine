import EmblaCarousel from "embla-carousel";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";

interface SliderOptions {
  mainId: string;
  autoplay?: boolean;
}
export const createSlider = (sliderOptions: SliderOptions) => {
  const emblaNode = document.getElementById(sliderOptions.mainId);

  if (emblaNode) {
    // Grab wrapper nodes
    const viewportNode =
      emblaNode.querySelector<HTMLElement>(".embla__viewport");

    // Grab button nodes
    const prevButtonNode = emblaNode.querySelector<HTMLElement>(".embla__prev");
    const nextButtonNode = emblaNode.querySelector<HTMLElement>(".embla__next");

    // Dots array
    const dots = emblaNode.querySelector<HTMLElement>(".embla__dots");

    // Thumbnails
    const thumbs = emblaNode.querySelector<HTMLElement>(".embla__thumbs");

    const options = { loop: true };
    const plugins = sliderOptions.autoplay
      ? [
          Autoplay({
            playOnInit: true,
            stopOnInteraction: false,
          }),
        ]
      : [];
    if (viewportNode) {
      const emblaApi = EmblaCarousel(viewportNode, options, plugins);
      const prevFunc = (_: MouseEvent) => {
        emblaApi.scrollPrev();
        sliderOptions.autoplay &&
          (emblaApi.plugins().autoplay as AutoplayType).reset();
      };
      const nextFunc = (_: MouseEvent) => {
        emblaApi.scrollNext();
        sliderOptions.autoplay &&
          (emblaApi.plugins().autoplay as AutoplayType).reset();
      };
      // Add click listeners
      if (prevButtonNode) {
        prevButtonNode.removeEventListener("click", prevFunc);
        prevButtonNode.addEventListener("click", prevFunc);
      }
      if (nextButtonNode) {
        nextButtonNode.removeEventListener("click", nextFunc);
        nextButtonNode.addEventListener("click", nextFunc);
      }

      const resetAutoPlay = () =>
        (emblaApi.plugins().autoplay as AutoplayType).reset();
      // Dots
      if (dots) {
        const allDots = [...dots.childNodes].filter(
          (n) => n.nodeType === 1
        ) as HTMLButtonElement[];

        emblaApi.on("select", (e) => {
          allDots[e.previousScrollSnap()].classList.remove(
            "bg-gray-700",
            "opacity-50"
          );
          allDots[e.selectedScrollSnap()].classList.add(
            "bg-gray-700",
            "opacity-50"
          );
        });

        const jumpToPhoto = (idx: number) => (_: MouseEvent) => {
          emblaApi.scrollTo(idx);
          sliderOptions.autoplay && resetAutoPlay();
        };

        allDots.forEach((dot, idx) => {
          (dot as HTMLElement).removeEventListener("click", jumpToPhoto(idx));
          (dot as HTMLElement).addEventListener("click", jumpToPhoto(idx));
        });
      }

      // Thumbnails
      if (thumbs) {
        // Grab wrapper nodes
        const viewportNode =
          thumbs.querySelector<HTMLElement>(".embla__viewport");

        if (viewportNode) {
          const emblaThumbs = EmblaCarousel(viewportNode, {
            containScroll: "keepSnaps",
            dragFree: true,
          });

          const onSlideClick = (idx: number) => () => {
            emblaThumbs.scrollTo(idx);
            emblaApi.scrollTo(idx);
            sliderOptions.autoplay && resetAutoPlay();
          };

          emblaThumbs.slideNodes().map((slide, idx) => {
            slide.removeEventListener("click", onSlideClick(idx));
            slide.addEventListener("click", onSlideClick(idx));
          });

          emblaThumbs.on("select", (e) => {
            emblaApi.scrollTo(e.selectedScrollSnap());
            emblaThumbs
              .slideNodes()
              [e.selectedScrollSnap()].classList.replace(
                "opacity-50",
                "opacity-100"
              );
            emblaThumbs
              .slideNodes()
              [e.previousScrollSnap()].classList.replace(
                "opacity-100",
                "opacity-50"
              );
          });
          emblaApi.on("select", (e) =>
            emblaThumbs.scrollTo(e.selectedScrollSnap())
          );
        }
      }
    }
  }
};

//document.addEventListener("astro:page-load", () => {
//createSlider({ mainId: "slider_reviews" });
//createSlider({ mainId: "slider_home", autoplay: true });
//});
