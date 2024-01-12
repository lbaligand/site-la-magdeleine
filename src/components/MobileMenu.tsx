import { type Component, createSignal, type JSXElement } from "solid-js";

const MobileMenu: Component<{ children: JSXElement; icon?: SVGElement }> = (
  props
) => {
  const [isExpanded, setIsExpanded] = createSignal<boolean>(false);
  let menuIcon!: HTMLDivElement;
  return (
    <div>
      <div
        ref={menuIcon!}
        class="cursor-pointer transition active:scale-125"
        onClick={() => setIsExpanded(!isExpanded())}
      >
        {props.icon}
      </div>
      <div
        class={`absolute top-[47px] left-0 transition-all duration-300 ease-in-out ${
          isExpanded() ? "h-[325px]" : "h-0"
        } w-screen overflow-hidden ease-in-out`}
      >
        <div class="w-full border-l border-l-gray-300 bg-white text-black">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
