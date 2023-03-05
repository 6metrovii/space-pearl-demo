"use sctrict"
window.addEventListener('DOMContentLoaded', () => {
    
    // mobile or pc
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');
    } else {
        document.body.classList.add('pc');
    }
    
    // menuBurger
    function menuBurger () {
        const menuIcon = document.querySelector(".menu-icon"),
                header = document.querySelector('.header');
        
        if ( menuIcon) menuIcon.addEventListener("click", () => {
            menuIcon.classList.toggle('active');
            menuIcon.parentElement.classList.toggle('active');
            document.body.classList.toggle('_lock');
        })
    }
    menuBurger();

    function fullScrinSections () {
        const sections = document.querySelectorAll('section'),
              whitepaperScreen = document.querySelector('.whitepaper'),
              nextSlideBtns = document.querySelectorAll('._next-section'),
              logo = document.querySelector('.header-logo'),
              headerLinks = document.querySelectorAll('.header-link'),
              menuIcon = document.querySelector('.menu-icon'),
              downloadBtn = document.querySelector("#download"),
              whitePaperBtn = document.querySelectorAll('#whitepaper'),
              buyNftBtn = document.querySelector('#nft');
        
        let slideIndex = 0;

        showSection(slideIndex);

        if(headerLinks.length > 0)  headerLinks.forEach((item, i)=> {
            item.addEventListener("click", (e) => {
                whitepaperScreen.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('active');
                    menuIcon.parentElement.classList.remove('active');
                    document.body.classList.remove('_lock');
                }
                if( e.target == headerLinks[headerLinks.length - 1]) {
                    whitepaperScreen.classList.add('active');
                } else {
                    slideIndex = 2 + i;
                    showSection(slideIndex)
                }
            });
        });
        if (logo) logo.addEventListener('click' , () => {
            if (menuIcon) {
                menuIcon.classList.remove('active');
                menuIcon.parentElement.classList.remove('active');
                document.body.classList.remove('_lock');
            }
            whitepaperScreen.classList.remove('active');
            slideIndex = 0;
            showSection(slideIndex);
        }) 
        if (downloadBtn) downloadBtn.addEventListener('click' , () => {
            console.log('re')
            slideIndex = sections.length - 1;
            showSection(slideIndex);
        }) ;
        if (buyNftBtn) buyNftBtn.addEventListener('click' , () => {
            console.log('buyNft')
        });
        if (whitePaperBtn.length > 0) whitePaperBtn.forEach(item =>  {
            item.addEventListener('click' , () => {
                whitepaperScreen.classList.add('active');
            });
        });

        nextSlideBtns.forEach(btn => btn.addEventListener('click', () => {
            if (slideIndex >= sections.length - 1) slideIndex = 0;
            else slideIndex++;
            showSection(slideIndex);
        }));

        function showSection(i) {
            sections.forEach(sec => {
                sec.classList.add('_hide-section');
                sec.classList.remove('_show-section')
            });
            sections[i].classList.remove('_hide-section');
            sections[i].classList.add('_show-section');
        }
    }
    fullScrinSections();

   /*
    // scroll to section 
    function scrollToSections () {
        const menuLinks = document.querySelectorAll('.header-link'),
            menuIcon = document.querySelector('.menu-icon'),
            header = document.querySelector('.header'),
            fullScrinSections = document.querySelectorAll('section'),
            headerHeight = header.offsetHeight;

        if (menuLinks.length > 0 ) menuLinks.forEach(link => link.addEventListener('click',scrollToSection));

        function scrollToSection (e) {
            const navLink = e.target;
            if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
                const gotoBlock = document.querySelector(navLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
            }
            menuIcon.classList.remove('active')
            header.classList.remove('active');
            document.body.classList.remove('_lock');
            e.preventDefault();

            if (document.body.classList.contains('touch')) {
                menuLinks.forEach((item, i) => {
                    if (item == e.target) {
                        fullScrinSections.forEach(section => {
                        section.style.transition = "all 0.6s ease";
                        section.classList.add('_section-hide');
                        });
                        fullScrinSections[i + 1].classList.remove('_section-hide');
                        fullScrinSections[i + 1].classList.add('_section-show');
                    }
                })
                
            }
        }
    }
    scrollToSections();
      
    //  slider
    function slider () {
        const slides = document.querySelectorAll(".slide"),  
                prev = document.querySelector(".prew-button"),  
                next = document.querySelector(".next-button"),  
                slidesWrapper = document.querySelector(".slide-wrapper"),  
                slidesField = document.querySelector(".slide-field"),     
                width = parseInt(window.getComputedStyle(slidesWrapper).width); 

        let slideIndex = 1; 
        let offset = 0;  

        if (slides) slides.forEach(slide => slide.style.width = width);
        if (next) next.addEventListener('click', nextSlide);
        if (prev) prev.addEventListener('click', prevSlide);
        if (slidesField) {
            slidesField.style.width = 100 * slides.length  + '%';   
            slidesField.style.transition = 'all 0.7s ease'; 
            }           

        function prevSlide () {
            if (offset == 0) {      
                offset = width * (slides.length -1);  
            } else {
                offset = offset - width; 
            }
            slidesField.style.transform = `translateX(-${offset}px)`;  
            
            if (slideIndex == 1) {            
                slideIndex = slides.length;
            } else {
                slideIndex--;              
            }
        }

        function nextSlide () {
            if (offset == width * (slides.length -1)) {      
                offset = 0;                       
            } else {
                offset = offset + width;  
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if (slideIndex == slides.length) {          
                slideIndex = 1;
            } else {
                slideIndex++;                          
            }
        } 
    }
    slider(); 
    
    // Tabs
    function tabs () {
        const tabsBtn = document.querySelectorAll('.tabs-button'),
                tabs = document.querySelectorAll('.work-tab');
    
        if ( tabsBtn.length > 0 ) {
            tabsBtn[0].classList.add('_active');
            tabsBtn[0].classList.add('icon-arrow-next');
            tabs[0].classList.add('_active');

            tabsBtn.forEach((btn, i) => btn.addEventListener('click', (e) => {
                tabsBtn.forEach(otherBtn => {
                    otherBtn.classList.remove('_active');
                    otherBtn.classList.remove('icon-arrow-next')
                } );
                btn.classList.add('_active');
                btn.classList.add('icon-arrow-next');
                tabs.forEach(tab => tab.classList.remove('_active'));
                tabs[i].classList.add('_active');
            }));
        }   
    }
    tabs(); */



});