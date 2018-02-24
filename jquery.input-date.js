
(function($) {

    var methods = {
        /**
         * Initialisation.
         *
         * @param   {Object} options
         * @returns {jQueryObject}
         */
        init: function(options)
        {
            if (this.length > 1) {
                this.each(function() {
                    $(this).date();
                });
                return this;
            }

            var $original = this.hide();
            var $datefield = getDateField($original);

            $datefield
                .val( dateIsoToFr($original.val()) )
                // Masque du format
                .inputmask('date', {
                    placeholder: 'jj/mm/aaaa'
                })
                // Affichage calendrier datepicker au focus
                .datepicker({
                    format: 'dd/mm/yyyy',
                    language: 'fr',
                    disableTouchKeyboard: true
                })
                // Synchro du champ original avec le champ date
                .on('change', function() {
                    $original.val( dateFrToIso($datefield.val()) ).trigger('change');
                });

            return $original;
        },

        /**
         * Modifie la valeur du champ (champ date + champ original).
         *
         * @param   {String} options
         * @returns {undefined}
         */
        update: function(value)
        {
            if (value === 'now') {
                var date = new Date();
                var d = date.toISOString().replace(/T.+$/, '').split('-');
                value = d[0]+'-'+d[1]+'-'+d[2];
            }

            this.val(value);
            getDateField(this).val( dateIsoToFr(value) );
        }
    };

    $.fn.inputDate = function(methodOrOptions)
    {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method '+methodOrOptions+' does not exist on jQuery.inputDate');
        }
    };

    /**
     * Retourne l'instance jQuery du champ date.
     * Le crée au préalable s'il n'existe pas.
     *
     * @param   {jQueryObject} $original
     * @returns {jQueryObject}
     */
    function getDateField($original)
    {
        var $datefield;

        // Le positionnement dans le DOM à une importance pour le border-radius
        // (appliqué à gauche du premier élément et à droite du dernier élément).
        // Le champ date doit donc être inséré en fonction de la position du addon.
        // En bref, il faut s'arranger pour que le champ original masqué se retrouve
        // entre le champ date et le addon.
        var $addon = $original.prev('.input-group-addon');
        if ($addon.length) {
            if ($original.next().hasClass('datefield')) {
                $datefield = $original.next();
            } else {
                $datefield = createDateField($original, $addon);
                $datefield.insertAfter($original);
            }
        } else {
            $addon = $original.next('.input-group-addon');
            if ($original.prev().hasClass('datefield')) {
                $datefield = $original.prev();
            } else {
                $datefield = createDateField($original, $addon);
                $datefield.insertBefore($original);
            }
        }

        return $datefield;
    }

    /**
     * Crée et initialise le champ date.
     *
     * @param   {jQueryObject} $original
     * @param   {jQueryObject} $addon
     * @returns {jQueryObject}
     */
    function createDateField($original, $addon)
    {
        // Création du champ date
        var $datefield = $('<input>');
        $datefield.attr('type', 'text');
        $datefield.attr('class', $original.attr('class')+' datefield');
        $datefield.prop('disabled', $original.prop('disabled'));
        $datefield.prop('readonly', $original.prop('readonly'));
        $datefield.prop('required', $original.prop('required'));

        if ($addon.length) {
            // Pour afficher le calendrier au clic sur l'îcone addon
            $addon
                .css('cursor', 'pointer')
                .click(function() {
                    $datefield.focus();
                });
        }

        return $datefield;
    }

    /**
     * Convertit une date au format ISO (Y-m-d) vers le format FR (d/m/Y).
     *
     * @param   {String} date
     * @returns {String}
     */
    function dateIsoToFr(date)
    {
        if (!date) {
            return '';
        }

        var d = date.split('-');

        return d[2]+'/'+d[1]+'/'+d[0];
    }

    /**
     * Convertit une date au format FR (d/m/Y) vers le format ISO (Y-m-d).
     *
     * @param   {String} date
     * @returns {String}
     */
    function dateFrToIso(date)
    {
        if (!date) {
            return '';
        }

        var d = date.split('/');

        return d[2]+'-'+d[1]+'-'+d[0];
    }

})(jQuery);
