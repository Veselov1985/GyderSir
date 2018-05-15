var multidel = {};

multidel.handlers = {
    findChildrenRectangle: function(parent) {
        var coordParent = parent.rectData;
        return paint.objects.disactiv.filter(function(elem, i) {
            return multidel.handlers.checkInRect(coordParent, elem.rectData);
        });
    },
    checkInRect: function(parentCoord, childCoord) {
        if (parentCoord[0].x < childCoord[0].x && parentCoord[1].x > childCoord[1].x && parentCoord[0].y < childCoord[0].y && parentCoord[1].y > childCoord[1].y) return true;
        return false;
    },
    deleteViewRect: function(arrChildrenRect) {
        arrChildrenRect.forEach(function(element) {
            paint.handlers.removesvgelems(element);
        });
    },
    deleteMemoryRect: function(arrChildrenRect) {

        paint.objects.disactiv = paint.objects.disactiv.filter(function(val) {
            var compare = true;

            arrChildrenRect.forEach(function(elChild) {
                if (elChild.id == val.id) compare = false;

            });
            return compare;
        });
    },
};

multidel.log = {

    init: function(parent) {
        var childrenRect = multidel.handlers.findChildrenRectangle(parent);
        multidel.handlers.deleteViewRect(childrenRect);
        multidel.handlers.deleteMemoryRect(childrenRect);
    }

};