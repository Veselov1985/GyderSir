var multidel = {};

multidel.handlers = {
    findChildrenRectangle: function(parent) {
        var coordParent = multidel.handlers.changeCoordParentRect(parent.rectData);
        return paint.objects.disactiv.filter(function(elem, i) {
            return multidel.handlers.checkInRect(coordParent, elem.rectData);
        });
    },
    checkInRect: function(parentCoord, childCoord) {
        if (parentCoord[0].x < childCoord[0].x && parentCoord[1].x > childCoord[1].x && parentCoord[0].y < childCoord[0].y && parentCoord[1].y > childCoord[1].y) return true;
        return false;
    },
    changeCoordParentRect: function(parentCord) {
        var arr = [
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];
        if (parentCord[0].x > parentCord[1].x) {
            arr[0].x = parentCord[1].x;
            arr[1].x = parentCord[0].x;
            arr[0].y = parentCord[0].y;
            arr[1].y = parentCord[1].y;
        } else {
            arr[0].x = parentCord[0].x;
            arr[1].x = parentCord[1].x;
            arr[0].y = parentCord[0].y;
            arr[1].y = parentCord[1].y;
        }
        if (parentCord[0].y > parentCord[1].y) {
            arr[0].y = parentCord[1].y;
            arr[1].y = parentCord[0].y;
        }
        return arr;
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