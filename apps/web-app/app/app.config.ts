export default defineAppConfig({
  app: {
    githubUrl: 'https://github.com/k39space/k39',
  },
  ui: {
    colors: {
      primary: 'black',
      secondary: 'zinc',
      neutral: 'zinc',
      error: 'rose',
    },
    slideover: {
      slots: {
        header: 'py-2',
      },
    },
    modal: {
      slots: {
        title: 'text-xl',
        close: 'top-5 scale-110',
      },
    },
    input: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    inputNumber: {
      variants: {
        size: {
          xl: 'px-4 py-3',
        },
      },
    },
    select: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    selectMenu: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3',
          },
        },
      },
    },
    button: {
      variants: {
        size: {
          xl: {
            base: 'px-4 py-3 font-semibold',
          },
        },
        variant: {
          gradient: 'text-neutral-950 bg-linear-to-br from-lime-300 to-green-400 hover:opacity-90 disabled:bg-none disabled:bg-elevated disabled:text-neutral-400 aria-disabled:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        },
      },
    },
    tabs: {
      variants: {
        variant: {
          gradient: {
            list: 'bg-elevated rounded-lg',
            trigger: 'data-[state=active]:bg-linear-to-br from-lime-300 to-green-400 data-[state=active]:text-neutral-950 flex-1 w-full',
            indicator: 'rounded-md shadow-xs',
          },
        },
      },
    },
    toast: {
      slots: {
        title: 'mb-0.5 text-lg/5 font-semibold',
        description: 'text-sm/4',
        icon: 'size-8',
      },
    },
  },
})
