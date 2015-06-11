Role.create({
    name: 'authenticatedDonor'
}, function(err, role) {
    if (err) return debug(err);
});