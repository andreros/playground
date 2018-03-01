from distutils.core import setup

setup(
    name='Python-Web-Scraper',
    author='André Rosa',
    author_email='andreros@gmail.com',
    version='0.1dev',
    packages=['src', 'src/common', 'src/scraper', 'src/test'],
    license='Creative Commons Attribution-Noncommercial-Share Alike license',
    long_description=open('README.md').read(),
)
