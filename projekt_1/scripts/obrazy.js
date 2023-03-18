class Obraz{
    constructor(src,title="",author="",desc=""){
        this.src = src;
        this.title = title;
        this.author = author;
        this.desc = desc;
    }
}
export const obrazy = [
    new Obraz("dali.jpg","The Persistence of Memory","Salvador Dali"),
    new Obraz("cezanne_mont_sainte_victorie.jpg","Mont Sante Victorie","Paul Cezanne"),
    new Obraz("mattise.jpg","Dance","Henry Matisse"),
    new Obraz("monet.jpg","Woman with a Parasol - Madame Monet and Her Son","Claude Monet"),
    new Obraz("monet_sunflowers.jpg","Sunflowers","Claude Monet"),
    new Obraz("van_gogh_sunflowers.jpg","Sunflowers","Van Gogh"),
    new Obraz("rembrant_samarytanin.jpg","Good Samarytanin","Rembrandt"),
    new Obraz("Matisse_Mur_Rose.jpg","Mur Rose","Henry Matisse"),
    new Obraz("Vermeer_woman.jpg","The Milkmaid","Jan Vermeer"),
    new Obraz("geographer.jpg","Geographer","Jan Vermeer")

]
