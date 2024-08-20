const LeftSidebar = () => {
  return (
    <div class="hidden w-[96px] flex-col  items-end gap-2 p-3 sm:flex">
      <button className="hidden h-[40px] items-center rounded-[24px] bg-brand-primary px-4 py-1 text-sm font-bold leading-[normal] text-white shadow-[0_2px_8px_0px_rgba(0,0,0,0.04)] sm:flex">
        Log in
      </button>
    </div>
  );
};

export default LeftSidebar;
