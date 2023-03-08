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
              buyNftBtn = document.querySelector('#nft'),
              tipWhitePaper = document.querySelector('#link-paper'),
              tipSite = document.querySelector('#link-site'),
              tipNft = document.querySelector('#link-nft');

        let slideIndex = 0;

        showSection(slideIndex);

        if(tipWhitePaper) tipWhitePaper.addEventListener('click', () => {
            whitepaperScreen.classList.add('active');
            slideIndex = 0;
            activeHeaderLink();
        });
        if(tipNft) tipNft.addEventListener('click', () => {
            slideIndex = 5;
            showSection(slideIndex);
            activeHeaderLink();
        });
        if(tipSite) tipSite.addEventListener('click', () => {
            slideIndex = 0;
            showSection(slideIndex);
            activeHeaderLink();
        })

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
                    headerLinks.forEach(link => {
                        link.classList.remove("active");
                    });
                    headerLinks[headerLinks.length - 1].classList.add('active')
                } else {
                    slideIndex = 2 + i;
                    showSection(slideIndex);
                    activeHeaderLink();
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
            headerLinks.forEach(link => {
                link.classList.remove("active");
            });
        }) 
        if (downloadBtn) downloadBtn.addEventListener('click' , () => {
            slideIndex = sections.length - 1;
            showSection(slideIndex);
        }) ;
        if (buyNftBtn) buyNftBtn.addEventListener('click' , () => {
            slideIndex = 5;
            showSection(slideIndex);
            activeHeaderLink();
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
            activeHeaderLink();
        }));

        function activeHeaderLink () {
            headerLinks.forEach(link => {
                link.classList.remove("active");
            });
            if ( slideIndex >= 2 && slideIndex !== 7) {
                headerLinks[slideIndex - 2].classList.add('active')
            }
            
        }

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

   //  slider
    function slider () {
        const sliders = document.querySelectorAll('._slider');
        if (sliders.length > 0) { 

            sliders.forEach(slider =>  {

                const slides = slider.querySelectorAll("._slide"),  
                      prev = slider.querySelector("._slide-prew"),  
                      next = slider.querySelector("._slide-next"),  
                      slidesWrapper = slider.querySelector("._slider-wrapper"),  
                      slidesField = slider.querySelector("._slider-field"),     
                      dotsWrapper = slider.querySelector('._slider-dots'),
                      width = parseInt(window.getComputedStyle(slidesWrapper).width); 

                let slideIndex = 1; 
                let offset = 0;  

                if (dotsWrapper) {
                    for(let i = 0; i < slides.length; i++) {
                        const dot = document.createElement('div');

                        dot.classList.add('slider-dot')
                        dotsWrapper.append(dot);
                    }
                } 
                if (slides) slides.forEach(slide => slide.style.width = width);
                if (next) next.addEventListener('click', nextSlide);
                if (prev) prev.addEventListener('click', prevSlide);
                if (slidesField) {
                    slidesField.style.display = "flex";
                    slidesField.style.width = 100 * slides.length  + '%';   
                    slidesField.style.transition = 'all 0.7s ease'; 
                }   
                
                const dots = slider.querySelectorAll('.slider-dot');

                activeDot();

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
                    activeDot();
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
                    activeDot();
                } 
                
                function activeDot () {
                    if (dots.length > 0) {
                        dots.forEach(dot => dot.classList.remove('active'));
                        dots[slideIndex - 1].classList.add('active');
                    }
                }
            });
        }
        
    }
    slider();
    
    // tips 

    // form
    function form () {
        const form = document.forms[0],
              formMessage = form.querySelector('.form-message'),
              inputName = form.formName,
              inputMail = form.formMail;

        let namePlaceholder = inputName.placeholder;
        let malePlaceholder = inputMail.placeholder;

        hoverPlaceholder(inputName, namePlaceholder);
        hoverPlaceholder(inputMail, malePlaceholder);

        form.addEventListener('submit', sendForm);

        function sendForm (e) {
            e.preventDefault();
            form.reset();
            const formData = new FormData(form);
            formMessage.classList.add('active');
                setTimeout(() => {
                    formMessage.classList.remove('active');
                },4000)

            const url = 'send.php';

            /* fetch(url, {
                method: Get,
                body: formData,
            }).then(responce =>  {
            }).catch(error => {
                formMessage.textContent = "An error occurred while sending the message :("
                console.log(error.message)
            }) */
        }

        function hoverPlaceholder (input , placeholder) {
            if (input) {
                input.addEventListener('focus', () => {
                    input.placeholder = ""
                    input.classList.add('focus');
                });
                input.addEventListener('blur', () => {
                    input.placeholder = placeholder;
                    input.classList.remove('focus');
                });
            }
        }
    }
    form();

    // Tabs
    function tabs () {
        const tabsBtn = document.querySelectorAll('.tabs-button'),
                tabs = document.querySelectorAll('.tab-item');
        if ( tabsBtn.length > 0 ) {
            tabsBtn.forEach(btn => btn.classList.remove('active'));
            if (tabs.length > 0) {
                tabs.forEach(tab => tab.classList.remove('active'));
                tabsBtn[5].classList.add('active');
                tabs[5].classList.add('active');
                tabsBtn.forEach(btn => btn.addEventListener('click', () => {
                    tabsBtn.forEach(other => other.classList.remove('active'));
                    tabs.forEach(other => other.classList.remove('active'));
                    btn.classList.add('active');
                    tabs.forEach(tab => {
                        if(tab.dataset.tab == btn.dataset.tab) {
                            tab.classList.add('active');
                        }
                    });
                }));
            }
        }   
    }
    tabs(); 



});